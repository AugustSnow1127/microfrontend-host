declare module 'sider/App' {
  const mount = (
    element: Element,
    extraArgs: { onNavigate?: LocationListener; initialPath?: string },
  ): { onParentNavigate: LocationListener } => undefined;

  export { mount };
}