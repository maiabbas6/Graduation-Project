import '../models/appointment_model.dart';
import '../models/cost_model.dart';
import '../models/cost_summary_model.dart';

class HomeData {
  final List<CostModel> costs;
  final CostSummaryModel summary;
  final AppointmentModel? nextAppointment;

  HomeData({
    required this.costs,
    required this.summary,
    this.nextAppointment,
  });
}
