# Generated by Django 4.2 on 2023-08-28 10:21

from django.db import migrations, models
import rooms.models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0003_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='file_path',
            field=models.FileField(upload_to=rooms.models.file_upload_path),
        ),
    ]