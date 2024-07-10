#import "AppDelegate.h"
#import "RNSplashScreen.h"

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"Banoka";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  bool didFinish = [super application:application didFinishLaunchingWithOptions:launchOptions];
  if (didFinish) {
      self.window.rootViewController.view.backgroundColor = [UIColor colorWithRed: 0.25 green: 0.25 blue: 0.25 alpha: 1.00];
  }
  return didFinish;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
