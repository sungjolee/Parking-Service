# askcompany/accounts/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm

from .models import User


class SignupForm(UserCreationForm):  # 장고에서 제공하는 UserCreationForm를 상속받아 활용
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].required = True
        self.fields['first_name'].required = True
        self.fields['last_name'].required = True

    class Meta(UserCreationForm.Meta):  # Meta 클래스를 덮어 써버리지 않기위해 상속받아서 구현한다.
        model = User  # User객체를 현재 프로젝트에서 사용하는 User객체로 해야한다. 아니면 기본 auth.User객체를 사용하기 때문.
        fields = ['username', 'email', 'first_name', 'last_name']

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email:
            qs = User.objects.filter(email=email)
            if qs.exists():
                raise forms.ValidationError('이미 등록된 이메일 주소입니다.')
        return email