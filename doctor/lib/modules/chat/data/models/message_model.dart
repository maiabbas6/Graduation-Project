class MessageModel {
  final int id;
  final int chatId;
  final String question;
  final String answer;
  final String createdAt;
  final String? image;

  MessageModel({
    required this.id,
    required this.chatId,
    required this.question,
    required this.answer,
    required this.createdAt,
    this.image,
  });

  factory MessageModel.fromJson(Map<String, dynamic> json) {
    return MessageModel(
      id: json['id'],
      chatId: json['chat_id'],
      question: json['question'] ?? '',
      answer: json['answer'] ?? '',
      createdAt: json['created_at'],
      image: json['image_url'],
    );
  }

  bool get isSending => id == -1;
}
