import '../../../../../core/base_controllers/pagination_controller.dart';
import '../../../data/data_sources/chat_data_source.dart';
import '../../../data/models/chat_model.dart';

class ChatListController extends PaginationController<ChatModel> {
  @override
  Future<List<ChatModel>> paginationCallApi(int page) =>
      ChatDataSource.getChats(page);
}
