from django.shortcuts import render
import random
import time

# Create your views here.
def index(request):
    def changebg():
        gifs = ['gifs/2.gif', 'gifs/3.gif', 'gifs/4.gif', 'gifs/5.gif', 'gifs/6.gif', 'gifs/7.gif']
        gif = random.choice(gifs)
        return gif
    
    context = {'gif': changebg}
    return render(request, 'index.html', context)



