<div id="page-header" class="bd-shadow-primary bg-secondary min-max-65 radius-lg w-full pt-md d-flex justify-between items-center w-mx-1200">
    <div class="overflow-hidden d-flex justify-start items-center gap-sm">
        <?php if(isset($img)): ?>
            <img src="<?php echo e(asset($img)); ?>" alt="<?php echo e($title); ?>" class="img-size-20">
        <?php endif; ?>
        <h1 class="text-2xl fw-sb color-light"><?php echo e($title); ?></h1>
    </div>
    <?php if(isset($content)): ?>
        <?php echo $content; ?>

    <?php endif; ?>
</div>
<?php /**PATH C:\Users\AugustoHeitor\Documents\Meu\projetos\central_de_comando\resources\views/layouts/pageHeader.blade.php ENDPATH**/ ?>