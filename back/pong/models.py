from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from asgiref.sync import async_to_sync

class UserProfile(AbstractUser):
    update_from = models.CharField(max_length=100, default='created', blank=True, null=True)
    email = models.EmailField(unique=True)
    tourn_won = models.IntegerField(default=0)
    matches_won = models.IntegerField(default=0)
    matches_lost = models.IntegerField(default=0)
    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.jpg')
    status = models.CharField(max_length=10, default='is_offline')
    language = models.CharField(max_length=9, default='english')
    def __str__(self):
        return self.username

class Match(models.Model):
    # Model fields
    player1 = models.CharField(max_length=30, blank=True)
    player2 = models.CharField(max_length=30, blank=True)
    player1_score = models.IntegerField(default=0)
    player2_score = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)

    @classmethod
    def create_match_from_game(cls, game_instance):
        """
        Class method to create a match record from a game instance.
        This method handles game logic, updating user profiles based on the game outcome.
        """
        # Fetch player profiles based on usernames provided by the game instance
        player1_user = UserProfile.objects.filter(username=game_instance.player1).first()
        player2_user = UserProfile.objects.filter(username=game_instance.player2).first()

        # Determine game outcome and update player records
        if game_instance.p1_score > game_instance.p2_score:
            if player1_user:
                player1_user.matches_won += 1
                player1_user.save(update_fields=['matches_won'])
            if player2_user:
                player2_user.matches_lost += 1
                player2_user.save(update_fields=['matches_lost'])
        elif game_instance.p1_score < game_instance.p2_score:
            if player1_user:
                player1_user.matches_lost += 1
                player1_user.save(update_fields=['matches_lost'])
            if player2_user:
                player2_user.matches_won += 1
                player2_user.save(update_fields=['matches_won'])

        # Create and return the match record
        match = cls.objects.create(
            player1=game_instance.player1,
            player2=game_instance.player2,
            player1_score=game_instance.p1_score,
            player2_score=game_instance.p2_score,
        )
        return match

    def __str__(self):
        # String representation of the model
        return f'{self.player1} vs {self.player2}'

# Signal to handle post-save actions for Match model
@receiver(post_save, sender=Match)
def update_stats(sender, instance, created, **kwargs):
    """
    Signal to update stats after a match is saved. If the match is newly created,
    update stats for both players involved.
    """
    if created:
        # Iterate over both players involved in the match
        for user in [instance.player1, instance.player2]:
            try:
                userProfile = UserProfile.objects.get(username=user)
            except UserProfile.DoesNotExist:
                print(f"UserProfile with username {user} does not exist.")
                continue
            
            # Assuming StatsConsumer exists to send real-time updates
            consumer = StatsConsumer.instances.get(userProfile.id)
            if consumer:
                from .views import match_stats
                stats = match_stats(userProfile)
                async_to_sync(consumer.send_stats_to_all)(stats)

class Friend(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    )
    sender = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='receiver')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return self.sender.username + ' -> ' + self.receiver.username + ' (' + self.status + ')'
