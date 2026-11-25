class CostSummaryModel {
  final double totalPaid;
  final double totalUnpaid;
  final double total;

  CostSummaryModel({
    required this.totalPaid,
    required this.totalUnpaid,
    required this.total,
  });

  factory CostSummaryModel.fromJson(Map<String, dynamic> json) {
    return CostSummaryModel(
      totalPaid: (json['total_paid'] as num).toDouble(),
      totalUnpaid: (json['total_unpaid'] as num).toDouble(),
      total: (json['total'] as num).toDouble(),
    );
  }
}
