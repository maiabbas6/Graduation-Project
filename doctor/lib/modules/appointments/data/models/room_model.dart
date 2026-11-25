class RoomModel {
  final int? id;
  final String? name;
  final String? createdAt;
  final String? updatedAt;

  RoomModel({
    this.id,
    this.name,
    this.createdAt,
    this.updatedAt,
  });

  factory RoomModel.fromJson(Map<String, dynamic> json) {
    return RoomModel(
      id: json['id'],
      name: json['name'],
      createdAt: json['created_at'],
      updatedAt: json['updated_at'],
    );
  }
}
