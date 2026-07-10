import Layout from "@theme/Layout";

export default function Privacy() {
  return (
    <Layout title="Privacy Policy" description="OpsKat privacy policy">
      <main className="container margin-vert--xl">
        <article className="markdown">
          <h1>OpsKat Privacy Policy</h1>
          <p>
            <strong>Effective date:</strong> July 3, 2026
          </p>

          <p>
            OpsKat is a local-first desktop application for managing infrastructure assets such as SSH hosts,
            RDP desktops, databases, object storage, Redis, MongoDB, Kafka, Kubernetes, and etcd.
          </p>
          <p>This policy explains what information OpsKat stores or transmits when you use the app.</p>

          <h2>Local Data</h2>
          <p>OpsKat stores app data locally on your device. This may include:</p>
          <ul>
            <li>Infrastructure asset names and connection settings</li>
            <li>Hostnames, ports, usernames, and related configuration</li>
            <li>Encrypted credentials, keys, and API keys</li>
            <li>App preferences and settings</li>
            <li>Local audit logs for operations performed through the app</li>
            <li>AI provider configuration that you choose to add</li>
          </ul>
          <p>This data is stored on your device. OpsKat does not require an OpsKat cloud account for normal use.</p>

          <h2>Network Connections You Configure</h2>
          <p>
            OpsKat connects from your device to the infrastructure endpoints that you configure, such as SSH servers,
            SFTP and RDP servers, databases, object-storage services, Redis, MongoDB, Kafka, Kubernetes, and etcd endpoints.
          </p>
          <p>
            Connection data, commands, queries, files, and responses are exchanged directly between your device and the
            endpoints you configure. OpsKat does not relay this infrastructure traffic through an OpsKat-operated
            service.
          </p>

          <h2>Optional AI Providers</h2>
          <p>
            OpsKat includes optional AI-assisted operation features. These features are disabled unless you configure an
            AI provider.
          </p>
          <p>
            If you add an OpenAI-compatible, Anthropic-compatible, or other supported AI provider endpoint, OpsKat may
            send your prompts, selected context, operation descriptions, tool results, and related technical information
            directly from your device to that provider endpoint so it can respond to your request.
          </p>
          <p>
            Your use of a third-party AI provider is governed by that provider's terms and privacy policy. Do not send
            secrets, private keys, passwords, customer data, or sensitive production data to an AI provider unless you
            have permission to do so.
          </p>

          <h2>Credentials</h2>
          <p>
            OpsKat is designed to store sensitive credentials locally in encrypted form. You are responsible for
            protecting access to your operating-system account, disk, backups, and exported files.
          </p>
          <p>OpsKat does not ask you to send infrastructure credentials to an OpsKat-operated backend service.</p>

          <h2>Analytics and Tracking</h2>
          <p>OpsKat does not use advertising identifiers.</p>
          <p>OpsKat does not track you across apps or websites for advertising or data-broker purposes.</p>
          <p>OpsKat does not currently operate a cloud analytics service for normal app usage.</p>

          <h2>Support Communications</h2>
          <p>
            If you contact the project maintainers for support, you may choose to provide information such as your email
            address, issue description, logs, screenshots, or diagnostic details. That information is used to respond to
            your request and improve the project.
          </p>
          <p>Before sharing logs or screenshots, remove secrets, credentials, private hostnames, IP addresses, and customer data.</p>

          <h2>Open Source Project</h2>
          <p>
            OpsKat is an open-source project. Issue trackers, discussions, pull requests, and community channels may be
            public. Do not post secrets or private infrastructure details in public channels.
          </p>

          <h2>Changes to This Policy</h2>
          <p>This policy may be updated as OpsKat changes. The effective date above will be updated when material changes are made.</p>

          <h2>Contact</h2>
          <p>
            Email: <a href="mailto:yz@ggnb.top">yz@ggnb.top</a>
          </p>
          <p>
            Website: <a href="https://opskat.dev/">https://opskat.dev/</a>
          </p>
        </article>
      </main>
    </Layout>
  );
}
