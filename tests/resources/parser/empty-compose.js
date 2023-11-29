import { ComponentAttribute } from 'leto-modelizer-plugin-core';
import DockerComposeData from 'src/models/DockerComposeData';
import DockerComposeComponent from 'src/models/DockerComposeComponent';
import DockerComposeMetadata from 'src/metadata/DockerComposeMetadata';

const pluginData = new DockerComposeData();
const metadata = new DockerComposeMetadata(pluginData);
metadata.parse();

const dockerComposeDef = pluginData.definitions.components
  .find(({ type }) => type === 'Docker-Compose');

const dockerCompose = new DockerComposeComponent({
  id: 'empty-compose',
  path: './empty-compose.yaml',
  definition: dockerComposeDef,
  attributes: [
    new ComponentAttribute({
      name: 'version',
      type: 'String',
      definition: dockerComposeDef.definedAttributes
        .find(({ name }) => name === 'version'),
      value: '3.9',
    }),
  ],
});

pluginData.components.push(dockerCompose);

export default pluginData;
