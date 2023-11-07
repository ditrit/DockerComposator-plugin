import DockerComposePlugin from 'src/models/DockerComposePlugin';

describe('DockerComposePlugin', () => {
  it('should create a DockerComposePlugin instance ', () => {
    const plugin = new DockerComposePlugin();
    expect(plugin).not.toBeNull();
    expect(plugin).toBeInstanceOf(DockerComposePlugin);
  });
});
