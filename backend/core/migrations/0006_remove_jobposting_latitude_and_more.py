# Generated by Django 5.1.2 on 2024-11-21 05:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0005_jobposting_latitude_jobposting_longitude"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="jobposting",
            name="latitude",
        ),
        migrations.RemoveField(
            model_name="jobposting",
            name="longitude",
        ),
        migrations.AddField(
            model_name="jobposting",
            name="coordinates",
            field=models.JSONField(blank=True, null=True),
        ),
    ]