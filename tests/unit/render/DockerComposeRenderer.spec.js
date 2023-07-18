import DockerComposeRenderer from 'src/render/DockerComposeRenderer';
import { DefaultData } from 'leto-modelizer-plugin-core';

describe('Test DockerComposeRenderer', () => {
  describe('Test method: renderFiles', () => {
    it('should render an empty array', () => {
      const pluginData = new DefaultData();

      expect(new DockerComposeRenderer(pluginData).renderFiles()).toEqual([]);
    });
  });
});
