import { ComponentAttribute } from 'leto-modelizer-plugin-core';
import DockerComposeData from 'src/models/DockerComposeData';
import DockerComposeComponent from 'src/models/DockerComposeComponent';
import DockerComposeMetadata from 'src/metadata/DockerComposeMetadata';

const pluginData = new DockerComposeData();
const metadata = new DockerComposeMetadata(pluginData);
metadata.parse();

// Component definitions
const dockerComposeDef = pluginData.definitions.components
  .find(({ type }) => type === 'Docker-Compose');
const serviceDef = pluginData.definitions.components
  .find(({ type }) => type === 'Service');
const networkDef = pluginData.definitions.components
  .find(({ type }) => type === 'Network');
const volumeDef = pluginData.definitions.components
  .find(({ type }) => type === 'Volume');

// Common attributes definitions
const serviceImageAttributeDef = serviceDef.definedAttributes.find(({ name }) => name === 'image');
const dependsOnLinkDef = serviceDef.definedAttributes
  .find(({ name }) => name === 'depends_on').definedAttributes[0].definedAttributes
  .find(({ type }) => type === 'Link');

const parentComposeAttribute = new ComponentAttribute({
  name: 'parentCompose',
  type: 'String',
  definition: serviceDef.definedAttributes
    .find(({ name }) => name === 'parentCompose'),
  value: 'veto-full-compose',
});

// Instantiating components
const dockerCompose = new DockerComposeComponent({
  id: 'veto-full-compose',
  path: './veto-full-compose.yaml',
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

const veterinaryConfigServerService = new DockerComposeComponent({
  id: 'veterinary-config-server',
  path: './veto-full-compose.yaml',
  definition: serviceDef,
  attributes: [
    new ComponentAttribute({
      name: 'image',
      type: 'String',
      definition: serviceImageAttributeDef,
      value: 'veterinary-config-server:0.2',
    }),
    new ComponentAttribute({
      name: 'networks',
      type: 'Array',
      definition: serviceDef.definedAttributes
        .find(({ name }) => name === 'networks'),
      value: ['backend'],
    }),
    new ComponentAttribute({ ...parentComposeAttribute }),

  ],
});

const veterinaryMsService = new DockerComposeComponent({
  id: 'veterinary-ms',
  path: './veto-full-compose.yaml',
  definition: serviceDef,
  attributes: [
    new ComponentAttribute({
      name: 'image',
      type: 'String',
      definition: serviceImageAttributeDef,
      value: 'veterinary-ms:0.2',
    }),
    new ComponentAttribute({
      name: 'depends_on',
      type: 'Array',
      definition: serviceDef.definedAttributes.find(({ name }) => name === 'depends_on'),
      value: [
        new ComponentAttribute({
          name: null,
          type: 'Object',
          value: [
            new ComponentAttribute({
              name: 'service_veterinary-ms_0',
              type: 'Array',
              definition: dependsOnLinkDef,
              value: ['veterinary-config-server'],
            }),
            new ComponentAttribute({
              name: 'condition',
              type: 'String',
              value: 'service healthy',
            }),
          ],
        }),
      ],
    }),
    new ComponentAttribute({
      name: 'volumes',
      type: 'Array',
      definition: serviceDef.definedAttributes.find(({ name }) => name === 'volumes'),
      value: [
        new ComponentAttribute({
          name: null,
          type: 'Object',
          value: [
            new ComponentAttribute({
              name: 'volume_veterinary-ms_0',
              type: 'Array',
              value: ['data'],
            }),
            new ComponentAttribute({
              name: 'mount-path',
              type: 'String',
              value: 'service healthy',
            }),
          ],
        }),
      ],
    }),
    new ComponentAttribute({ ...parentComposeAttribute }),

  ],
});

const backendNetwork = new DockerComposeComponent({
  id: 'backend',
  path: './veto-full-compose.yaml',
  definition: networkDef,
  attributes: [
    new ComponentAttribute({
      name: 'driver',
      type: 'String',
      definition: networkDef.definedAttributes
        .find(({ name }) => name === 'driver'),
      value: 'custom-driver-0',
    }),
    new ComponentAttribute({ ...parentComposeAttribute }),

  ],
});

const dataVolume = new DockerComposeComponent({
  id: 'data',
  path: './veto-full-compose.yaml',
  definition: volumeDef,
  attributes: [
    new ComponentAttribute({
      name: 'driver',
      type: 'String',
      definition: volumeDef.definedAttributes
        .find(({ name }) => name === 'driver'),
      value: 'custom-driver',
    }),
    new ComponentAttribute({ ...parentComposeAttribute }),

  ],
});

// Adding components to pluginData
pluginData.components.push(dockerCompose);
pluginData.components.push(backendNetwork);
pluginData.components.push(dataVolume);
pluginData.components.push(veterinaryConfigServerService);
pluginData.components.push(veterinaryMsService);

// Invoke the setLinkDefinitions method to generate the links
pluginData.__setLinkDefinitions('Service', serviceDef.definedAttributes);

export default pluginData;
