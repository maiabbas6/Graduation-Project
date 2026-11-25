class AttachmentModel {
  final int id;
  final String parentType;
  final int parentId;
  final String path;
  

  AttachmentModel({
    required this.id,
    required this.parentType,
    required this.parentId,
    required this.path,
  
  });

  factory AttachmentModel.fromJson(Map<String, dynamic> json) {
    return AttachmentModel(
      id: json['id'] ?? 0,
      parentType: json['parent_type'] ?? '',
      parentId: json['parent_id'] ?? 0,
      path: json['path'] ?? '',
    );
  }
}