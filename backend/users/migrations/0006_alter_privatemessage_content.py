# Generated by Django 4.2 on 2023-10-09 12:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_privatemessage_from_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='privatemessage',
            name='content',
            field=models.CharField(error_messages={'blank': 'Treść wiadomości nie może być pusta.'}, max_length=8192),
        ),
    ]
