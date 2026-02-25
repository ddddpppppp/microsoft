-- 創意應用程式 区块描述（按商店 itemId 对应，缺的 .desc 可用商店原文替换）
-- 执行: mysql -u root -proot ms_store < scripts/update_descriptions_creative.sql
USE ms_store;

UPDATE products SET description = 'Canva is an all-in-one visual communication platform that empowers the world to design. It''s a simple way to create beautiful presentations, infographics, videos, t-shirts, websites, social media posts, and more. Canva is for everyone with an idea to share, whether you''re a student, educator, entrepreneur, or professional.', updated_at = NOW() WHERE ms_id = 'xp8k17rnmm8mtn';

UPDATE products SET description = '爱笔思画是一款人气绘图应用，下载量突破数亿。提供超过47000种笔刷、21000种素材、2100种字体、84种滤镜等专业功能，支持录制并分享绘画过程视频，具备防抖、多种尺子、剪贴蒙版、无限图层等，适合插画与漫画创作。', updated_at = NOW() WHERE ms_id = '9pfdf2zd4z4n';

UPDATE products SET description = 'Sketchbook Pro is an award-winning drawing and painting app for professionals and enthusiasts. Create stunning artwork with a full set of brushes, layers, and professional-grade tools. Perfect for sketching, illustration, and concept art.', updated_at = NOW() WHERE ms_id = '9npqcdpgj6sz';

UPDATE products SET description = 'Photoshop is an image creation, graphic design and photo editing software developed by Adobe. Create and enhance photographs, illustrations, and 3D artwork. Design websites and mobile apps. Edit videos, simulate real-life paintings, and more.', updated_at = NOW() WHERE ms_id = 'xpfd4t9n395qn6';

UPDATE products SET description = 'Paint.NET is free image and photo editing software for PCs running Windows. It features an intuitive and innovative user interface with support for layers, unlimited undo, special effects, and a wide variety of useful and powerful tools.', updated_at = NOW() WHERE ms_id = '9nbhcs1lx4r0';

UPDATE products SET description = 'VSCO''s advanced online photo editor. Upgrade your photo editing with VSCO AI Photo Editor — professional AI tools, batch photo editing, and quality photo filters.', updated_at = NOW() WHERE ms_id = '9nrtvfllggtv';

UPDATE products SET description = '概念画板（Concepts）是一款专业的素描、绘图与设计应用。用无限画布、矢量与栅格混合、可调笔刷与物件库，快速完成草图、插画、UI 与产品设计。支持 Windows 触控与触控笔。', updated_at = NOW() WHERE ms_id = '9ngqm8fph9wq';

UPDATE products SET description = 'ArtRage Vitae is a natural painting and drawing app. Paint with oils, watercolors, and realistic tools. Create stunning digital art with customizable brushes, layers, and effects. Perfect for artists who want a traditional feel with digital convenience.', updated_at = NOW() WHERE ms_id = '9njk057nfzcp';

UPDATE products SET description = 'Sketchable Plus is a professional drawing and sketching app for Windows. Create detailed artwork with a full suite of brushes, layers, and blending modes. Optimized for Surface and touch devices.', updated_at = NOW() WHERE ms_id = '9mzzlhtz5n02';

UPDATE products SET description = 'Adobe Express (formerly Adobe Spark) makes it easy to create and share social graphics, short videos, and web pages. Use templates and quick actions to design marketing content, stories, and more. Included with Adobe Creative Cloud.', updated_at = NOW() WHERE ms_id = '9p94lh3q1cp5';
