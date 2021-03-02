# svelte-viewpoint changelog

# 1.4.2
* Minor fix in `package.json`.

# 1.4.1
* Add babel and prettier configs to `package.json`.

## 1.4.0
* Now default slot of `Viewpoint` passed to default slot of target component.

## 1.3.1
* Exclude superfluous dependencies for re-run `preload`. 

## 1.3.0
* Re-run `preload` if some of the target component props changed.
* Use $$restProps instead of manual collecting.
* Code formatting via Prettier.
* Fix devDeps.
* Compiled files now also shipped.

## 1.2.4
* Additional check to be whether we are dealing with regular function or Svelte component (class).

## 1.2.3
* Set `timeout` & `abort` default values to prevent warnings.
* Update README.
* Add bundled code to git.

## 1.2.2
* Update README.

## 1.2.0
* Re-write.
* Update README.
* Fix preload props.
* Remove `loading`, `waiting`, `error` components via props (slots only).
* Make `preloading` default is true.

## 1.0.0

* First release
