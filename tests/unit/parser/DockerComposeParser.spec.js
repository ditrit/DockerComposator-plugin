import fs from 'fs';
import { FileInformation, FileInput } from 'leto-modelizer-plugin-core';
import DockerComposeParser from 'src/parser/DockerComposeParser';
import DockerComposeMetadata from 'src/metadata/DockerComposeMetadata';
import DockerComposeData from 'src/models/DockerComposeData';

import mockData from 'tests/resources/parser/veto-full-compose';
import emptyComposeMockData from 'tests/resources/parser/empty-compose';

describe('Test DockerComposeParser', () => {
  describe('Test functions', () => {
    describe('Test function: isParsable', () => {
      it('Should return true on .yml file', () => {
        const parser = new DockerComposeParser();
        const file = new FileInformation({ path: 'simple.yml' });

        expect(parser.isParsable(file)).toEqual(true);
      });

      it('Should return true on .yaml file', () => {
        const parser = new DockerComposeParser();
        const file = new FileInformation({ path: 'simple.yaml' });

        expect(parser.isParsable(file)).toEqual(true);
      });

      it('Should return false on file that is not a YAML file', () => {
        const parser = new DockerComposeParser();
        const file = new FileInformation({ path: 'file.txt' });

        expect(parser.isParsable(file)).toEqual(false);
      });

      it('Should return false on wrong file', () => {
        const parser = new DockerComposeParser();
        const file = new FileInformation({ path: '.github/workflows/simple.tf' });

        expect(parser.isParsable(file)).toEqual(false);
      });
    });

    describe('Test function: parse', () => {
      it('Should set empty components on no input files', () => {
        const pluginData = new DockerComposeData();
        const parser = new DockerComposeParser(pluginData);
        parser.parse();

        expect(pluginData.components).not.toBeNull();
        expect(pluginData.components.length).toEqual(0);
      });

      it('Should set empty components on null input files', () => {
        const pluginData = new DockerComposeData();
        const parser = new DockerComposeParser(pluginData);
        const file = new FileInput({
          path: '',
          content: null,
        });
        parser.parse(new FileInformation({ path: '' }), [file]);

        expect(pluginData.components).not.toBeNull();
        expect(pluginData.components.length).toEqual(0);
      });

      it('Should set valid components', () => {
        const pluginData = new DockerComposeData();
        const metadata = new DockerComposeMetadata(pluginData);
        metadata.parse();

        const parser = new DockerComposeParser(pluginData);
        const file = new FileInput({
          path: './veto-full-compose.yaml',
          content: fs.readFileSync('tests/resources/parser/veto-full-compose.yaml', 'utf8'),
        });
        parser.parse(new FileInformation({ path: './veto-full-compose.yaml' }), [file]);
        expect(pluginData.components).toEqual(mockData.components);
      });

      it('Should set empty children on file containing only docker-compose element', () => {
        const pluginData = new DockerComposeData();
        const metadata = new DockerComposeMetadata(pluginData);
        metadata.parse();

        const parser = new DockerComposeParser(pluginData);

        const file = new FileInput({
          path: './empty-compose.yaml',
          content: fs.readFileSync('tests/resources/parser/empty-compose.yaml', 'utf8'),
        });
        parser.parse(new FileInformation({ path: './empty-compose.yaml' }), [file]);
        expect(pluginData.components).toEqual(emptyComposeMockData.components);
      });
    });
  });
});
