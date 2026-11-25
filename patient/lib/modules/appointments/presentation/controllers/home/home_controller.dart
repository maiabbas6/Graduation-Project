import '../../../../../core/base_controllers/load_data_controller.dart';
import '../../../data/data_sources/cost_data_source.dart';
import '../../../data/models/home_data.dart';

class HomeController extends LoadDataController<HomeData> {
  @override
  Future<HomeData> callApi() async {
    final costsFuture = CostDataSource.getCosts();
    final summaryFuture = CostDataSource.getCostSummary();
    final nextAppointmentFuture = CostDataSource.getNextAppointment();

    final costs = await costsFuture;
    final summary = await summaryFuture;
    final nextAppointment = await nextAppointmentFuture;

    return HomeData(
      costs: costs,
      summary: summary,
      nextAppointment: nextAppointment,
    );
  }
}
