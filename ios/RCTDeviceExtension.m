//
//  RCTDeviceExtension.m
//  AwesomeProject
//
//  Created by 朱孝城 on 2016/11/9.
//  Copyright © 2016年 Facebook. All rights reserved.
//
#import <UIKit/UIKit.h>
#import "RCTDeviceExtension.h"
#import "RCTUtils.h"
#import "RCTEventDispatcher.h"

@implementation RCTDeviceExtension

static NSDictionary *DynamicDimensions(){
  CGFloat width = MIN(RCTScreenSize().width, RCTScreenSize().height);
  CGFloat height = MAX(RCTScreenSize().width, RCTScreenSize().height);
  CGFloat scale = RCTScreenScale();

  if (UIDeviceOrientationIsLandscape([UIDevice currentDevice].orientation)) {
    width = MAX(RCTScreenSize().width, RCTScreenSize().height);
    height = MIN(RCTScreenSize().width, RCTScreenSize().height);
  }

  return @{@"width":@(width),
           @"height":@(height),
           @"scale":@(scale)
           };
}

RCT_EXPORT_METHOD(getDynamicDimensions:(RCTResponseSenderBlock)callback){
  callback(@[[NSNull null],DynamicDimensions()]);
}

-(instancetype)init{
  self = [super init];
  if (self) {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(orientationDidChange:) name:UIDeviceOrientationDidChangeNotification object:nil];
  }
  return self;
}

- (void)dealloc{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

@synthesize bridge =_bridge;

- (void)orientationDidChange:(id)noti{
  [_bridge.eventDispatcher sendDeviceEventWithName:
   @"orientationDidChange" body:
   @{@"Orientation":UIDeviceOrientationIsLandscape([UIDevice currentDevice].orientation)? @"Landscape":@"Portrait",
     @"Demensions":DynamicDimensions()
     }
   ];
}

- (NSDictionary *)constantsToExport{
  return @{@"EVENT_ORITATION":@"orientationDidChange"};
}
RCT_EXPORT_MODULE();

@end

