# Generated by Django 3.0.4 on 2020-06-30 19:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('mainapp', '0012_auto_20200622_2238'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='asker',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='asker', to=settings.AUTH_USER_MODEL),
        ),
    ]
