import Plugin from 'src/index';

describe('Test index of project', () => {
  it('should return DockerComposePlugin', () => {
    expect(new Plugin().constructor.name).toEqual('DockerComposePlugin');
  });

  it('Index should return all needed objects', () => {
    expect(Plugin.PluginDrawer).not.toBeNull();
    expect(Plugin.PluginMetadata).not.toBeNull();
    expect(Plugin.PluginParser).not.toBeNull();
    expect(Plugin.PluginRenderer).not.toBeNull();
    expect(Plugin.resources).not.toBeNull();
  });
});
