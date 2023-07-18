import DockerComposeMetadata from 'src/metadata/DockerComposeMetadata';
import { DefaultData } from 'leto-modelizer-plugin-core';

describe('Test class: DockerComposeMetadata', () => {
  describe('Test method: validate', () => {
    it('should return true', () => {
      expect(new DockerComposeMetadata().validate()).toEqual(true);
    });
  });

  describe('Test method: parse', () => {
    it('should set components definitions to empty array', () => {
      const pluginData = new DefaultData();
      pluginData.definitions.components = ['a'];

      new DockerComposeMetadata(pluginData).parse();

      expect(pluginData.definitions.components).toEqual([]);
    });
  });
});
