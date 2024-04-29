# Generated by Django 5.0.3 on 2024-04-28 19:48

import cloudinary.models
import django.contrib.auth.models
import django.contrib.auth.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdministrativeRegion',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('name_en', models.CharField(max_length=255)),
                ('code_name', models.CharField(max_length=255, null=True)),
                ('code_name_en', models.CharField(max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='AdministrativeUnit',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('full_name', models.CharField(max_length=255, null=True)),
                ('full_name_en', models.CharField(max_length=255, null=True)),
                ('short_name', models.CharField(max_length=255, null=True)),
                ('short_name_en', models.CharField(max_length=255, null=True)),
                ('code_name', models.CharField(max_length=255, null=True)),
                ('code_name_en', models.CharField(max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='HomeNumber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('information', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='PaymentMethod',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('image', models.ImageField(upload_to='payment_methods')),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='name')),
                ('description', models.TextField(blank=True, null=True, verbose_name='description')),
            ],
        ),
        migrations.CreateModel(
            name='StatusOrder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.IntegerField()),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='TypeDelivery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=255)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('additional_fee_per_500gram', models.DecimalField(decimal_places=2, max_digits=10)),
                ('max_time', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=255)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='avatars/')),
                ('phone_number', models.CharField(blank=True, max_length=20, null=True)),
                ('cccd', models.CharField(blank=True, max_length=12, null=True)),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
                ('role', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.role')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Auction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=255, verbose_name='name')),
                ('description', models.TextField(null=True, verbose_name='description')),
                ('weight', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='weight')),
                ('collection', models.IntegerField(verbose_name='collection')),
                ('image', cloudinary.models.CloudinaryField(max_length=255, null=True, verbose_name='image_auctions')),
                ('source', models.CharField(max_length=255, verbose_name='source')),
                ('destination', models.CharField(max_length=255, verbose_name='destination')),
                ('phone_number_giver', models.CharField(max_length=15, verbose_name='phone_number_giver')),
                ('start_time', models.DateTimeField(verbose_name='start_time')),
                ('end_time', models.DateTimeField(verbose_name='end_time')),
                ('start_price', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='start_price')),
                ('current_price', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='current_price')),
                ('status', models.BooleanField(default=True, verbose_name='status')),
                ('priority', models.IntegerField(default=0, verbose_name='priority')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='auctions', to=settings.AUTH_USER_MODEL)),
                ('winner_shipper', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='auctions_winner', to=settings.AUTH_USER_MODEL)),
                ('type_payment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='auctions_payment_methods', to='api.paymentmethod')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Bid',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('auction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bids', to='api.auction')),
                ('shipper', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bids_shipper', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=255)),
                ('content', models.TextField()),
                ('is_read', models.BooleanField(default=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Province',
            fields=[
                ('code', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('name_en', models.CharField(max_length=255, null=True)),
                ('full_name', models.CharField(max_length=255)),
                ('full_name_en', models.CharField(max_length=255, null=True)),
                ('code_name', models.CharField(max_length=255, null=True)),
                ('administrative_region', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.administrativeregion')),
                ('administrative_unit', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.administrativeunit')),
            ],
        ),
        migrations.CreateModel(
            name='District',
            fields=[
                ('code', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('name_en', models.CharField(max_length=255, null=True)),
                ('full_name', models.CharField(max_length=255, null=True)),
                ('full_name_en', models.CharField(max_length=255, null=True)),
                ('code_name', models.CharField(max_length=255, null=True)),
                ('province_code', models.CharField(max_length=20, null=True)),
                ('administrative_unit', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.administrativeunit')),
                ('province', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.province')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name_product', models.CharField(max_length=255)),
                ('weight', models.CharField(max_length=255)),
                ('source', models.CharField(max_length=255)),
                ('destination', models.CharField(max_length=255)),
                ('phone_number_giver', models.CharField(max_length=15)),
                ('time_pickup', models.CharField(max_length=255)),
                ('time_deliver', models.CharField(max_length=255)),
                ('collection', models.DecimalField(decimal_places=2, max_digits=10)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('us_collect', models.DecimalField(decimal_places=2, max_digits=10)),
                ('auction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='api.auction')),
                ('shipper', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders_shipper', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to=settings.AUTH_USER_MODEL)),
                ('type_payment', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='orders_payment_methods', to='api.paymentmethod')),
                ('status_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='api.statusorder')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Ward',
            fields=[
                ('code', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('name_en', models.CharField(max_length=255, null=True)),
                ('full_name', models.CharField(max_length=255, null=True)),
                ('full_name_en', models.CharField(max_length=255, null=True)),
                ('code_name', models.CharField(max_length=255, null=True)),
                ('district_code', models.CharField(max_length=20, null=True)),
                ('administrative_unit', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.administrativeunit')),
                ('district', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.district')),
            ],
        ),
    ]