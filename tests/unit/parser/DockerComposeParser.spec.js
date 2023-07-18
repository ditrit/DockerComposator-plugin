import DockerComposeParser from 'src/parser/DockerComposeParser';
import {
  DefaultData,
  FileInformation,
} from 'leto-modelizer-plugin-core';

describe('Test DockerComposeParser', () => {
  describe('Test methods', () => {
    describe('Test method: isParsable', () => {
      it('should return false', () => {
        expect(new DockerComposeParser().isParsable(new FileInformation({
          path: '',
        }))).toEqual(false);
      });
    });

    describe('Test method: getModels', () => {
      it('should return an empty array without parameter', () => {
        const parser = new DockerComposeParser();

        expect(parser.getModels()).toEqual([]);
      });
    });

    describe('Test method: parse', () => {
      it('should set pluginData components and parseErrors to empty array', () => {
        const pluginData = new DefaultData();
        const parser = new DockerComposeParser(pluginData);

        parser.parse();

        expect(parser.pluginData.components).toEqual([]);
        expect(parser.pluginData.parseErrors).toEqual([]);
      });
    });
  });
});
