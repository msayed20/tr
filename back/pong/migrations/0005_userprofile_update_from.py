# Generated by Django 4.2.13 on 2024-09-20 21:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pong', '0004_remove_userprofile_is_online_userprofile_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='update_from',
            field=models.CharField(blank=True, default='created', max_length=100, null=True),
        ),
    ]
