# Generated by Django 4.2 on 2023-07-27 05:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0007_schedule'),
    ]

    operations = [
        migrations.AddField(
            model_name='schedule',
            name='classes',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='classes', to='classes.class'),
        ),
    ]