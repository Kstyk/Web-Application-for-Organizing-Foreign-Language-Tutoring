# Generated by Django 4.2 on 2023-09-03 11:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0010_alter_file_file_path'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='archivized',
            field=models.BooleanField(default=False),
        ),
    ]