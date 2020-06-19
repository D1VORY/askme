from rest_framework import serializers
from .models import MyUser,Question, Answer
from django.contrib.auth.models import User
from rest_auth.serializers import UserDetailsSerializer
from friendship.models import FriendshipRequest,Friend


class UserSerializer(UserDetailsSerializer):

    gender = serializers.CharField(source="myuser.gender")
    

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('gender',)

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('myuser', {})
        gender = profile_data.get('gender')

        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.userprofile
        if profile_data and gender:
            profile.gender = gender
            profile.save()
        return instance



class DefaultUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','first_name','last_name']

class MyUserSerializer(serializers.ModelSerializer):
    user = DefaultUserSerializer(many=False, read_only=True)
    class Meta:
        model = MyUser
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    #question = QuestionSerializer(many=False, read_only =True)
    question_text = serializers.CharField(source='question.question_text')
    question_id = serializers.CharField(source='question.id')
    class Meta:
        model = Answer
        fields = ('id','answer_text','likes','dislikes','question_text','question_id')


class FriendshipRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = FriendshipRequest
        fields = ('id', 'from_user', 'to_user', 'message', 'created', 'rejected', 'viewed')

class FriendSerializer(serializers.ModelSerializer):

    class Meta:
        model = Friend
        fields = ('id','created','from_user_id','to_user_id')

class AnswerCreateSerializer(serializers.ModelSerializer):
    question_id = serializers.CharField()
    class Meta:
        model = Answer
        fields = ('answer_text','question_id')

    def create(self,validated_data):
        #print(validated_data)
        text = validated_data.pop('answer_text')
        question_id = validated_data.pop('question_id')
        return Answer.objects.create(answer_text= text,question_id= question_id )
