from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
#router.register(r'answers', AnswerViewSet)
router.register(r'questions', QuestionViewSet, basename='questions')

urlpatterns = [
    #path('questions/',QuestionList.as_view(), name= 'questions'),
    path('answers/create/',AnswerCreateView.as_view(), name='create_answer' ),
    path('account/answers/',AnswersAccountListView.as_view(), name='account_answers' ),
    path('answers/',AnswersListView.as_view(), name='wall_answers' ),
    path('questions/create/',QuestionCreateView.as_view(), name='create_question' ),
    path('questions/<pk>/delete/',QestionDeleteView.as_view(), name= 'delete_question'),
    path('friends/', FriendListView.as_view(),name='friends_list'),
    path('users/search/', UserSearchListView.as_view(), name='user_search')
]

urlpatterns +=  router.urls
