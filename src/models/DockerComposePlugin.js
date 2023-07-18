import {
  DefaultPlugin,
  DefaultData,
} from 'leto-modelizer-plugin-core';
import DockerComposeDrawer from 'src/draw/DockerComposeDrawer';
import DockerComposeMetadata from 'src/metadata/DockerComposeMetadata';
import DockerComposeParser from 'src/parser/DockerComposeParser';
import DockerComposeRenderer from 'src/render/DockerComposeRenderer';
import DockerComposeConfiguration from 'src/models/DockerComposeConfiguration';
import packageInfo from 'package.json';

/**
 * DockerCompose plugin.
 */
class DockerComposePlugin extends DefaultPlugin {
  /**
   * Default constructor.
   * @param {object} [props] - Object that contains all properties to set.
   * @param {object} [props.event] - Event manager.
   * @param {Function} [props.event.next] - Function to emit event.
   */
  constructor(props = {
    event: null,
  }) {
    const configuration = new DockerComposeConfiguration();
    const pluginData = new DefaultData(configuration, {
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
