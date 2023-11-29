import {
  DefaultPlugin,
} from 'leto-modelizer-plugin-core';
import DockerComposeData from 'src/models/DockerComposeData';
import DockerComposeDrawer from 'src/draw/DockerComposeDrawer';
import DockerComposeMetadata from 'src/metadata/DockerComposeMetadata';
import DockerComposeParser from 'src/parser/DockerComposeParser';
import DockerComposeRenderer from 'src/render/DockerComposeRenderer';
import DockerComposeConfiguration from 'src/models/DockerComposeConfiguration';
import packageInfo from 'package.json';

/**
 * Docker compose plugin.
 */
class DockerComposePlugin extends DefaultPlugin {
  /**
   * Default constructor.
   * @param {object} props - Plugin properties.
   * @param {string} props.event - Event data.
   */
  constructor(props = {
    event: null,
  }) {
    const configuration = new DockerComposeConfiguration({
      defaultFileName: 'docker-compose.yaml',
      defaultFileExtension: 'yaml',
    });

    const pluginData = new DockerComposeData(configuration, {
      name: packageInfo.name,
      version: packageInfo.version,
    }, props.event);

    super({
      pluginData,
      pluginDrawer: new DockerComposeDrawer(pluginData),
      pluginMetadata: new DockerComposeMetadata(pluginData),
      pluginParser: new DockerComposeParser(pluginData),
      pluginRenderer: new DockerComposeRenderer(pluginData),
      configuration,
    });
  }
}

export default DockerComposePlugin;
