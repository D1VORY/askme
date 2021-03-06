from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
#router.register(r'answers', AnswerViewSet)
router.register(r'questions', QuestionViewSet, basename='questions')

urlpatterns = [
    #path('questions/',QuestionList.as_view(), name= 'questions'),
    path('users/<username>/info/stats/', AccountInfoStatsView, name="user_info_stats"),
    path('users/<username>/info/', AccountInfoView.as_view(), name="user_account_info"),
    path('users/<username>/answers/', AnswersAccountListView.as_view(), name="user_account_answers"),

    path('account/settings/update/', AccountSettingsView.as_view(), name="account_settings_update"),
    path('account/info/stats/', AccountInfoStatsView, name="account_info_stats"),
    path('account/info/', AccountInfoView.as_view(), name="account_info"),
    path('account/answers/',AnswersAccountListView.as_view(), name='account_answers' ),

    path('answer/<pk>/dislike/',AnswerLikeView.as_view(), name='dislike_answer' ),
    path('answer/<pk>/like/',AnswerLikeView.as_view(), name='like_answer' ),
    path('answer/<answerId>/comments/', CommentListView.as_view(), name='comments_list'),
    path('answer/<answerId>/comment/create/', createCommentView, name='create_comment'),
    path('answers/create/',AnswerCreateView.as_view(), name='create_answer' ),
    path('answers/',AnswersListView.as_view(), name='wall_answers' ),



    path('questions/multiple/create/',MultipleQuestionsCreateView.as_view(), name='create_multiple_questions' ),
    path('questions/create/',QuestionCreateView.as_view(), name='create_question' ),
    path('questions/<pk>/delete/',QuestionDeleteView.as_view(), name= 'delete_question'),


    path('friendship/delete/<pk>/',deleteFrienshipView ,name='delete_friendship'),
    path('friendship/request/create/<pk>/', createFrienshipRequestView ,name='create_friendship_request'),
    path('friendship/reject/<pk>/', rejectFriendshipView ,name='reject_friend_request'),
    path('friendship/create/<pk>/', AcceptFriendshipView.as_view(),name='accept_friend_request'),
    path('friends/requests/', FriendRequestsListView.as_view(),name='friend_requests_list'),
    path('friends/', FriendListView.as_view(),name='friends_list'),
    path('users/search/', UserSearchListView.as_view(), name='user_search')
]

urlpatterns +=  router.urls
