# Generated by Django 4.2.13 on 2024-09-20 22:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pong', '0005_userprofile_update_from'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='update_from',
            field=models.CharField(blank=True, default='created', max_length=100, null=True),
        ),
    ]
