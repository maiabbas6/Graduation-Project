import '../../../../core/constants/api_const.dart';
import '../../../../core/network/network_helper.dart';
import '../models/chat_model.dart';
import '../models/message_model.dart';

class ChatDataSource {
  
  static Future<List<ChatModel>> getChats(int page) async {
    var response = await NetworkHelper().get('${ApiConst.aiChat}?page=$page');
    List rawList = response.data['data'];
    
    return rawList.map((json) => ChatModel.fromJson(json)).toList();
  }

  static Future<ChatModel> newChat(String message, {String? image}) async {
    var response = await NetworkHelper().post(
      ApiConst.newChat,
      body: {'message': message},
      files: image != null ? {'image': image} : null,
    );
    return ChatModel.fromJson(response.data['data']);
  }

  static Future<ChatModel> getChat(int id) async {
    var response = await NetworkHelper().get(ApiConst.chatById(id));
    return ChatModel.fromJson(response.data['data']);
  }

  static Future<MessageModel> sendMessage(int chatId, String message,
      {String? image}) async {
    var response = await NetworkHelper().post(
      ApiConst.messageChat(chatId),
      body: {'message': message},
      files: image != null ? {'image': image} : null,
    );
    return MessageModel.fromJson(response.data['data']);
  }
}
