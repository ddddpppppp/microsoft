USE ms_store;

DELETE FROM banners WHERE page IN ('home', 'apps', 'games');

INSERT INTO banners (title, subtitle, image_url, local_image, link_url, button_text, badge_text, display_order, type, page) VALUES
('Microsoft 365', '管理每日工作的應用程式', '', '/assets/images/hero-placeholder.svg', '/detail/microsoft-365', '▶ 获取', '', 1, 'hero', 'home'),
('加入 Game Pass', '新作上市當天即可暢玩', '', '/assets/images/hero-placeholder.svg', '#', '获取', '', 2, 'hero', 'home'),
('Minecraft: Java & Bedrock Edition for PC', '立即遊戲', '', '/assets/images/hero-placeholder.svg', '/detail/minecraft', '获取', 'Game Pass Premium • Ultimate • PC', 3, 'hero', 'home'),
('精选应用合集', '发现最受欢迎的应用和游戏', '', '/assets/images/hero-placeholder.svg', '/apps', '全部显示', '', 4, 'hero', 'home'),
('Copilot', '你的日常 AI 助手', '', '/assets/images/hero-placeholder.svg', '/detail/copilot', '获取', '免费', 5, 'hero', 'home');

INSERT INTO banners (title, subtitle, image_url, local_image, link_url, button_text, badge_text, display_order, type, page) VALUES
('Overwatch® 2', '立即透過 Xbox Game Pass 購買或玩遊戲', '', '/assets/images/hero-placeholder.svg', '#', '', 'Game Pass', 1, 'featured', 'home'),
('社交網路應用程式', '聯繫和學習', '', '/assets/images/hero-placeholder.svg', '/apps', '', '', 2, 'featured', 'home'),
('CyberSafe: Bad Connection?', '立即遊戲', '', '/assets/images/hero-placeholder.svg', '#', '', 'Game Pass Premium • Ultimate • PC', 3, 'featured', 'home');

INSERT INTO banners (title, subtitle, image_url, local_image, link_url, button_text, badge_text, display_order, type, page) VALUES
('最佳娛樂 App', '隨時隨地與您的電影、電視和音樂在一起', '', '/assets/images/hero-placeholder.svg', '/apps', '全部显示', '', 1, 'hero', 'apps'),
('Drawboard PDF', '', '', '/assets/images/hero-placeholder.svg', '#', '获取', '', 2, 'hero', 'apps'),
('Raycast', '您通往一切的捷徑', '', '/assets/images/hero-placeholder.svg', '#', '获取', '', 3, 'hero', 'apps'),
('CapCut: AI Video Maker', '立即下載！', '', '/assets/images/hero-placeholder.svg', '#', '获取', '', 4, 'hero', 'apps'),
('創意應用程式', '尋找可激發靈感的應用程式', '', '/assets/images/hero-placeholder.svg', '/apps', '全部显示', '', 5, 'hero', 'apps');

INSERT INTO banners (title, subtitle, image_url, local_image, link_url, button_text, badge_text, display_order, type, page) VALUES
('Microsoft 365', '管理每日工作的應用程式', '', '/assets/images/hero-placeholder.svg', '/detail/microsoft-365', '获取', '', 1, 'featured', 'apps'),
('Dolby Access', '', '', '/assets/images/hero-placeholder.svg', '#', '', '', 2, 'featured', 'apps'),
('GeoPhoto', '', '', '/assets/images/hero-placeholder.svg', '#', '', '', 3, 'featured', 'apps');

INSERT INTO banners (title, subtitle, image_url, local_image, link_url, button_text, badge_text, display_order, type, page) VALUES
('Overwatch® 2', '立即透過 Xbox Game Pass 購買或玩遊戲', '', '/assets/images/hero-placeholder.svg', '#', '获取', 'Game Pass', 1, 'hero', 'games'),
('加入 Game Pass', '新作上市當天即可暢玩', '', '/assets/images/hero-placeholder.svg', '#', '获取', '', 2, 'hero', 'games'),
('High On Life 2', 'Available with Game Pass Ultimate', '', '/assets/images/hero-placeholder.svg', '#', '获取', 'Game Pass Ultimate • PC', 3, 'hero', 'games'),
('Romeo is a Dead Man', '立即透過 Xbox Game Pass 購買或玩遊戲', '', '/assets/images/hero-placeholder.svg', '#', '获取', '', 4, 'hero', 'games');

INSERT INTO banners (title, subtitle, image_url, local_image, link_url, button_text, badge_text, display_order, type, page) VALUES
('CyberSafe: Bad Connection?', '立即遊戲', '', '/assets/images/hero-placeholder.svg', '#', '获取', 'Game Pass Premium • Ultimate • PC', 1, 'featured', 'games'),
('TCG Card Shop Simulator', '', '', '/assets/images/hero-placeholder.svg', '#', '', '', 2, 'featured', 'games'),
('農曆新年特賣', '最多可省 50%', '', '/assets/images/hero-placeholder.svg', '#', '', '', 3, 'featured', 'games');
