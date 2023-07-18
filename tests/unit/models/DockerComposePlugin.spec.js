import DockerComposePlugin from 'src/models/DockerComposePlugin';

describe('Test class: DockerComposePlugin', () => {
  describe('Test constructor', () => {
    it('Check variable initialization', () => {
      const plugin = new DockerComposePlugin();

      expect(plugin.data).not.toBeNull();
      expect(plugin.__drawer).not.toBeNull();
      expect(plugin.__parser).not.toBeNull();
      expect(plugin.__metadata).not.toBeNull();
      expect(plugin.__renderer).not.toBeNull();
    });
  });
});
