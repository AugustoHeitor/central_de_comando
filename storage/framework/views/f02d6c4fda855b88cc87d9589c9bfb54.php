<!DOCTYPE html>
<html lang="pt-BR" class="w-full h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php echo $__env->yieldContent('metas'); ?>
    
    <title><?php echo e(config('app.name')); ?> | <?php echo $__env->yieldContent('title'); ?></title>
    <link rel="icon" href="<?php echo e(asset('imgs/satellite-light.svg')); ?>" type="image/svg+xml">
    <link rel="stylesheet" href="<?php echo e(asset('css/globalStyles.css')); ?>">
    <link rel="stylesheet" href="<?php echo e(asset('css/reset.css')); ?>">
    <link rel="stylesheet" href="<?php echo e(asset('css/layouts/template.css')); ?>">

    <?php if(Auth::check()): ?>
        <link rel="stylesheet" href="<?php echo e(asset('css/layouts/sideMenu.css')); ?>">
        <link rel="stylesheet" href="<?php echo e(asset('css/layouts/menuMobile.css')); ?>">
    <?php endif; ?>

    <?php echo $__env->yieldContent('links'); ?>
    <?php echo $__env->yieldContent('scripts'); ?>
</head>
<body class="w-full h-full <?php echo e(Auth::check() ? 'd-flex' : ''); ?>">

    <div class="<?php echo e(Auth::check() ? 'body-container' : 'w-full h-full'); ?>">
        <?php if(Auth::check()): ?>
            <?php echo $__env->make('layouts.sideMenu', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
            <?php echo $__env->make('layouts.menuMobile', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
        <?php endif; ?>
        <?php echo $__env->yieldContent('content'); ?> 
    </div>
</body>
</html><?php /**PATH C:\Users\AugustoHeitor\Documents\Meu\projetos\central_de_comando\resources\views/layouts/template.blade.php ENDPATH**/ ?>