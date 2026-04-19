from django.http import JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError
from .models import Prompt
import redis
import os
import json

import random

@csrf_exempt
def prompts_list(request):
    if request.method == 'GET':
        prompts = list(Prompt.objects.all().values('id', 'title', 'complexity', 'created_at'))
        return JsonResponse({'prompts': prompts}, safe=False)
    
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            prompt = Prompt(
                title=data['title'],
                content=data['content'],
                complexity=data['complexity']
            )
            prompt.full_clean()  # Validate
            prompt.save()
            return JsonResponse({'id': prompt.id, 'message': 'Prompt created'}, status=201)
        except (KeyError, ValidationError, json.JSONDecodeError) as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def prompt_detail(request, pk):
    if request.method == 'GET':
        try:
            prompt = Prompt.objects.get(id=pk)
            key = f"prompt:{pk}:views"
            try:
                r = redis.Redis(host=os.getenv('REDIS_HOST', 'redis'), port=6379, db=0, decode_responses=True)
                view_count = r.incr(key)
            except:
                view_count = random.randint(1, 100)  # Mock for local dev
            data = {
                'id': prompt.id,
                'title': prompt.title,
                'content': prompt.content,
                'complexity': prompt.complexity,
                'created_at': prompt.created_at.isoformat(),
                'view_count': int(view_count)
            }
            return JsonResponse(data)
        except Prompt.DoesNotExist:
            return JsonResponse({'error': 'Prompt not found'}, status=404)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

