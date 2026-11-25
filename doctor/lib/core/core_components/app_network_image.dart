import 'package:extended_image/extended_image.dart';
import 'package:flutter/material.dart';

class AppNetworkImage extends StatelessWidget {
  final String url;
  final BoxShape? shape;
  final double? width;
  final double? height;
  final BoxFit? fit;
  final BorderRadius? borderRadius;
  const AppNetworkImage(this.url,{super.key, this.shape,this.width,this.height,this.fit, this.borderRadius});


  @override
  Widget build(BuildContext context) {
    var widget =  ExtendedImage.network(
      fit: fit,
      filterQuality: FilterQuality.high,
      height: height,
      width: width,
      url,
      enableLoadState: true,
      cache: true,
      shape: shape,
      cacheMaxAge: const Duration(seconds: 30),
      loadStateChanged: (state){
        if(state.extendedImageLoadState == LoadState.failed){
          return LayoutBuilder(
            builder: (context,constrains) {
              return Center(
                  child: Icon(Icons.image_not_supported_outlined,size: constrains.maxWidth*0.2,)
              );
            }
          );
        }
        return null;
      },
    );
    
    return borderRadius != null ? ClipRRect(
      borderRadius: borderRadius!,
      child: widget,
    ):widget;
  }
}
