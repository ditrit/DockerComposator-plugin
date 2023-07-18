import { DefaultConfiguration, Tag } from 'leto-modelizer-plugin-core';

/**
 * DockerCompose configuration.
 */
class DockerComposeConfiguration extends DefaultConfiguration {
  /**
   * Default constructor.
   * @param {object} [props] - Object that contains all properties to set.
   */
  constructor(props) {
    super({
      ...props,
      defaultFileName: 'compose.yaml',
      defaultFileExtension: 'yml',
      editor: {
        ...props?.editor,
      },
      tags: [
        new Tag({ type: 'language', value: 'DockerCompose' }),
        new Tag({ type: 'category', value: 'Infrastructure' }),
        new Tag({ type: 'category', value: 'Container' }),
      ],
    });
  }
}

export default DockerComposeConfiguration;
