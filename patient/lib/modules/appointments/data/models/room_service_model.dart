class RoomServiceModel {
  final int id;
  final String name;
  final String price;

  RoomServiceModel({
    required this.id,
    required this.name,
    required this.price,
  });

  factory RoomServiceModel.fromJson(Map<String, dynamic> json) {
    return RoomServiceModel(
      id: json['id'],
      name: json['name'] ?? '',
      price: json['price']?.toString() ?? '0.00',
    );
  }
}
