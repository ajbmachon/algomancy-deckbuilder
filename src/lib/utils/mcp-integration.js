/**
 * Utility functions for integrating with shadcn-ui components via MCP
 */

/**
 * Install a shadcn-ui component via MCP
 * @param {string} componentName - Name of the component to install
 * @returns {Promise<object>} - Result of the installation
 */
export async function installComponent(componentName) {
  try {
    // Code to interface with MCP for component installation
    const response = await fetch(`/api/mcp/install-component?name=${componentName}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to install component ${componentName}:`, error);
    throw error;
  }
}

/**
 * Use a shadcn-ui component via MCP
 * @param {string} componentName - Name of the component to use
 * @param {object} props - Props to pass to the component
 * @returns {Promise<object>} - HTML, CSS, and JS for the component
 */
export async function useComponent(componentName, props) {
  try {
    // Code to use a shadcn-ui component via MCP
    const response = await fetch(`/api/mcp/use-component`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        componentName,
        props
      })
    });
    return await response.json();
  } catch (error) {
    console.error(`Failed to use component ${componentName}:`, error);
    throw error;
  }
}
