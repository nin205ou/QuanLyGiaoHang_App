# Generated by Django 5.0.3 on 2024-05-15 11:07

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_auction_end_time_alter_order_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_waiting_accept',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='auction',
            name='end_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 5, 15, 23, 7, 41, 492406, tzinfo=datetime.timezone.utc), verbose_name='end_time'),
        ),
        migrations.AlterField(
            model_name='otp',
            name='expired_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 5, 15, 11, 22, 41, 491432, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='user',
            name='is_staff',
            field=models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status'),
        ),
    ]
