from django.shortcuts import render, redirect
from pong.models import UserProfile
from back.email_verification import send_email
from .forms import CodeForm
from django.contrib.auth import login
from django.contrib import messages
from TwoFA.models import Code
from django.contrib.auth.decorators import login_required

def verify_view(request):
    form = CodeForm(request.POST or None)
    id = request.session.get('id')
    if id:
        user = UserProfile.objects.get(id=id)
        
        # Only generate a new code on a GET request, not on POST
        if request.method == 'GET':
            code_instance, created = Code.objects.get_or_create(user=user)
            code_instance.save()  # This will generate and save a new code

            # print(f"Username: {user.username}, Code: {code_instance.number}")  # For debugging
            # Pass the generated code to the send_email function
            send_email(code_instance.number, user.email, user.username)
        
        # If the form is submitted (POST request), verify the code
        if request.method == 'POST' and form.is_valid():
            code = form.cleaned_data.get('number')
            code_instance = Code.objects.get(user=user)  # Get the existing code

            # Check if the entered code matches the stored code
            if str(code_instance.number) == code:
                login(request, user)
                messages.success(request, 'You are now logged in!')
                return redirect('home')
            else:
                messages.error(request, 'Invalid code. Please try again.')
    
    return render(request, 'verify.html', {'form': form})
