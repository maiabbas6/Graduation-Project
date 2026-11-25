import 'message_model.dart';

class ChatModel {
  final int id;
  final int userId;
  final String title;
  final String? imageUrl;
  final DateTime createdAt;
  final List<MessageModel>? messages;

  ChatModel({
    required this.id,
    required this.userId,
    required this.title,
    this.imageUrl,
    required this.createdAt,
    this.messages,
  });

  factory ChatModel.fromJson(Map<String, dynamic> json) {
    return ChatModel(
      id: json['id'],
      userId: json['user_id'],
      title: json['title'],
      imageUrl: json['image_url'],
      createdAt: DateTime.parse(json['created_at']),
      messages: json['messages'] != null
          ? (json['messages'] as List)
              .map((e) => MessageModel.fromJson(e))
              .toList().reversed.toList()
          : null,
    );
  }
}
