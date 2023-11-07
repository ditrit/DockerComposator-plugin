import fs from 'fs';
import DockerComposeMetadata from 'src/metadata/DockerComposeMetadata';
import DockerComposeData from 'src/models/DockerComposeData';

/**
 * Create metadata from a specific metadata JSON file.
 * @param {string} metadataName - metadata name.
 * @param {string} metadataUrl - path to metadata JSON file.
 * @returns {DockerComposeMetadata} DockerComposeMetadata instance containing metadata
 * from specified url.
 */
export function getComposatorMetadata(metadataName, metadataUrl) {
  const metadata = JSON.parse(fs.readFileSync(metadataUrl, 'utf8'));
  const dockerComposatorPluginMetadata = new DockerComposeMetadata(new DockerComposeData());
  dockerComposatorPluginMetadata.jsonComponents = metadata;
  return dockerComposatorPluginMetadata;
}
