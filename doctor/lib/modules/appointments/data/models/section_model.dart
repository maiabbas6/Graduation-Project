class SectionModel {
  final int id;
  final String name;
  final String icon;
  

  SectionModel({required this.id, required this.name,required this.icon});

  factory SectionModel.fromJson(Map<String, dynamic> json) {
    return SectionModel(
      id: json['id'],
      name: json['name'],
      icon: json['icon'],
    );
  }
}
