from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomerType(models.Model):
    name = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name

class Customer(models.Model):
    name = models.CharField(max_length=200, blank=True)
    email = models.EmailField(blank=True)
    address = models.CharField(max_length=400, blank=True)
    elastic_index_name = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name


class Role(models.Model):
    role_type = models.CharField(max_length=200)
    is_user = models.BooleanField(default=False)

    def __str__(self):
        return self.role_type


class UserManager(BaseUserManager):
    def create_user(self, email, password):
        if not email:
            raise ValueError("Users must have a email address")
        if not password:
            raise ValueError("Users must have a password")
        user = self.model(
            email = self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email = self.normalize_email(email),
            password=password
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self.db)
        return user

# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(db_index=True, unique=True)
    phone_number = models.CharField(db_index=True, max_length=20, blank=True, null=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)

    # Will use this to remove customers from platform but data will still remain with us
    is_active = models.BooleanField(default=True)

    # These are default variables that django expects us to have in the User class
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    is_superuser = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)

    last_login = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


    # Will be used for internal and external monetization
    CustomerType = models.ForeignKey(CustomerType, related_name='user', null=True, blank=True, db_index=True, on_delete=models.CASCADE)

    # Stores various data providers
    Customer = models.ForeignKey(Customer, related_name='user', null=True, blank=True, db_index=True, on_delete=models.CASCADE)

    # What kind of role will determine how much acccess to platform
    role = models.ManyToManyField(Role, blank=True, related_name='user')

    objects = UserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

        
class newUsers(models.Model):
    companyName = models.CharField(max_length=200, blank=True)
    email = models.EmailField(db_index=True, unique=True)


    def __str__(self):
        return self.companyName


class brandCode(models.Model):
    brandName = models.CharField(max_length=200, blank=True)
    email = models.EmailField(db_index=True, unique=False, null=True, blank=True)


    def __str__(self):
        return self.brandName


class branch(models.Model):
    code = models.CharField(max_length=250, blank=True)
    phone_number = models.CharField(db_index=True, max_length=20, blank=True, null=True)
    branchName = models.CharField(max_length=100, blank=True)
    lattitude = models.FloatField()
    longitude = models.FloatField()
    createdon = models.DateTimeField(auto_now_add=True)
    customer = models.ForeignKey(Customer, related_name='branchName', null=True, blank=True, db_index=True, on_delete=models.CASCADE)
    additionalParam = models.JSONField(null=True, blank=True)


    def __str__(self):
        return self.phone_number


class member(models.Model):
    uid = models.CharField(max_length=250, blank=True)
    phone_number = models.CharField(db_index=True, max_length=20, blank=True, null=True)
    firstName = models.CharField(max_length=100, blank=True)
    lastName = models.CharField(max_length=100, blank=True)
    date_of_birth = models.DateTimeField(auto_now_add=False)
    createdon = models.DateTimeField(auto_now_add=False)
    lastmodifiedon = models.DateTimeField(auto_now_add=False)
    customer = models.ForeignKey(Customer, related_name='uid', null=True, blank=True, db_index=True, on_delete=models.CASCADE)
    lastPurchasedStore = models.ForeignKey(branch, related_name='uid', null=True, blank=True, db_index=True, on_delete=models.CASCADE)
    gender = models.CharField(max_length=1, blank=True)
    additionalParam = models.JSONField(null=True, blank=True)


    def __str__(self):
        return self.phone_number


class fieldMappings(models.Model):
    customerNames = models.CharField(max_length=250, blank=True)
    elasticNames = models.CharField(max_length=250, blank=True)
    platformVariables = models.CharField(max_length=250, blank=True)
    customer = models.ForeignKey(Customer, related_name='customerNames', null=True, blank=True, db_index=True, on_delete=models.CASCADE)


    def __str__(self):
        return self.phone_number


class inventory(models.Model):
    inventory_code = models.CharField(max_length=250, blank=True)
    group_name = models.CharField(db_index=True, max_length=20, blank=True, null=True)
    primaryClass = models.CharField(max_length=100, blank=True)
    secondaryClass = models.CharField(max_length=100, blank=True)
    brand = models.ForeignKey(brandCode, related_name='inventory_code', null=True, blank=True, db_index=True, on_delete=models.CASCADE)
    branch = models.ForeignKey(branch, related_name='inventory_code', null=True, blank=True, db_index=True, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, related_name='inventory_code', null=True, blank=True, db_index=True, on_delete=models.CASCADE)
    mrp = models.FloatField(null=True, blank=True)
    additionalParam = models.JSONField(null=True, blank=True)


    def __str__(self):
        return self.inventory_code



