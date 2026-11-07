import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import crypto from 'node:crypto';

const root = resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));

function run(cmd, input = null) {
  console.log(`> ${cmd}`);
  return execSync(cmd, { cwd: root, input, encoding: 'utf8', stdio: input ? ['pipe', 'pipe', 'inherit'] : 'pipe' });
}

async function deploy() {
  console.log('====================================================');
  console.log('  Daymark Cloudflare Worker + D1 Deployment');
  console.log('====================================================\n');

  // 1. Verify authentication
  try {
    const whoami = run('npx wrangler whoami');
    console.log(whoami);
  } catch (err) {
    console.error('\n❌ Not logged into Cloudflare.');
    console.error('Please run: npx wrangler login');
    process.exit(1);
  }

  // 2. Create D1 Database (or use existing)
  console.log('\n[1/5] Creating Cloudflare D1 database: daymark-attendance-db...');
  let databaseId = '';
  try {
    const listOutput = run('npx wrangler d1 list --json');
    const existing = JSON.parse(listOutput).find(d => d.name === 'daymark-attendance-db');
    if (existing) {
      databaseId = existing.uuid;
      console.log(`Found existing D1 database (ID: ${databaseId})`);
    }
  } catch (e) {}

  if (!databaseId) {
    try {
      const createOutput = run('npx wrangler d1 create daymark-attendance-db --json');
      const parsed = JSON.parse(createOutput);
      databaseId = parsed.uuid || parsed.database_id;
      console.log(`Created new D1 database (ID: ${databaseId})`);
    } catch (err) {
      console.error('Failed to create D1 database:', err.message);
      process.exit(1);
    }
  }

  // 3. Generate wrangler.toml
  console.log('\n[2/5] Writing wrangler.toml with D1 binding...');
  const wranglerToml = `name = "daymark-attendance"
main = "worker/index.js"
compatibility_date = "2024-04-01"

[vars]
OFFICE_ID = "OFFICE-HQ"

[[d1_databases]]
binding = "DB"
database_name = "daymark-attendance-db"
database_id = "${databaseId}"
`;
  writeFileSync(resolve(root, 'wrangler.toml'), wranglerToml, 'utf8');
  console.log('Wrote wrangler.toml successfully.');

  // 4. Apply Schema Migration
  console.log('\n[3/5] Applying D1 schema migration (migrations/0001_initial.sql)...');
  try {
    run('npx wrangler d1 execute daymark-attendance-db --file=migrations/0001_initial.sql --remote -y');
    console.log('Schema migration applied successfully.');
  } catch (err) {
    console.error('Migration error:', err.message);
    process.exit(1);
  }

  // 5. Set Secrets
  console.log('\n[4/5] Configuring secrets (ADMIN_PASSWORD & SECRET_KEY)...');
  const adminPassword = process.env.ADMIN_PASSWORD || 'QeMTpvULQD!jQqBPkB5hSCSx';
  const secretKey = process.env.SECRET_KEY || crypto.randomBytes(32).toString('hex');

  try {
    run('npx wrangler secret put ADMIN_PASSWORD', adminPassword);
    run('npx wrangler secret put SECRET_KEY', secretKey);
    console.log('Secrets configured successfully.');
  } catch (err) {
    console.error('Warning setting secrets:', err.message);
  }

  // 6. Deploy Worker
  console.log('\n[5/5] Deploying Cloudflare Worker...');
  const deployOutput = run('npx wrangler deploy');
  console.log(deployOutput);

  console.log('\n🎉 DEPLOYMENT COMPLETE! Your Daymark QR Attendance system is live on Cloudflare!');
}

deploy().catch(err => {
  console.error('\nDeployment failed:', err);
  process.exit(1);
});
